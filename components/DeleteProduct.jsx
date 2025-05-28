import { useState } from "react";
import { useSelector } from "react-redux";
import {IconButton,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,Snackbar,Alert,Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../api/productService"; // נניח שיש שירות API למחיקת מוצרים

const DeleteProduct = ({ product, onDeleteSuccess }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // בדיקת הרשאות - אם המשתמש הוא מנהל
  const user = useSelector((state) => state.user?.currentUser);
  const isAdmin = user?.role === "ADMIN";

  // אם המשתמש אינו מנהל, לא להציג את הכפתור בכלל
  if (!isAdmin) {
    return null;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      console.log("פרטי המוצר:", product); // הדפסת פרטי המוצר
      console.log("טוקן המשתמש:", user?.token); // הדפסת הטוקן
      if (!user || user.role !== "ADMIN") {
        alert("No permission to delete products");
        return;
      }
      if (!user.token) {
        alert("You need to log in again");
        return;
      }
      setLoading(true);

      // קבלת ה-token מה-store
      const token = user?.token;
      console.log("token " + token);
      // קריאה לשרת למחיקת המוצר עם ה-token
      await deleteProduct(product._id, token);

      // סגירת הדיאלוג
      setOpen(false);

      // הצגת הודעת הצלחה
      setSnackbar({
        open: true,
        message: `המוצר "${product.productName}" נמחק בהצלחה`,
        severity: "success"
      });

      // קריאה לפונקציית callback להודעה לקומפוננטת האב
      if (onDeleteSuccess) {
        onDeleteSuccess(product._id);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      console.error("Error", error);


      // הצגת הודעת שגיאה
      setSnackbar({
        open: true,
        message: `Error deleting the product: ${error.message || "Please try again later."}`,
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      {/* כפתור המחיקה */}
      <Tooltip title="מחק מוצר">
        <IconButton
          onClick={handleClickOpen}
          aria-label="מחק מוצר"
          color="error"
          size="small"
          className="delete-product-button"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* דיאלוג אישור מחיקה */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`This action will permanently delete the product."${product.productName}" from the system and cannot be restored.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            autoFocus
            disabled={loading}
          >
            {loading ? "delete..." : "delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* הודעת סנאקבר להצגת סטטוס הפעולה */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteProduct;
