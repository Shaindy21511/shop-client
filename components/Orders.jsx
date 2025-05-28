import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersByUser } from "../api/orderService";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;

      setLoading(true); // שיהיה גם אם המשתמש משתנה

      try {
        const res = await getOrdersByUser(user._id);

        const sortedOrders = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography>No orders found</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">Order #{order._id}</Typography>
              <Typography>
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Typography>Address: {order.address}</Typography>
              <Typography sx={{ marginTop: 1 }}>Items:</Typography>
              {order.arrProduct.map((item) => (
                <Typography key={item._id}>
                  - {item.productName} x {item.qty}
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Orders;
