import React, { useEffect } from 'react'
import {confirmOrder, deliveredOrder, getOrders, shipOrder, deleteOrder} from '../../State/Admin/Order/Action'
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
//import {deleteOrder, deliveredOrder, confirmOrder, shipOrder} from '../../State/Admin/Order/Action'



const OrdersTable = () => {
  const dispatch = useDispatch();
  const  {adminOrder} = useSelector(store=>store)

  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event,index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  useEffect(()=>{
    dispatch(getOrders())
  },[adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deletedOrder]);

  console.log("admin Orders ",adminOrder)

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    console.log("handle shipped order ", orderId)
    handleClose();
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    console.log("handle confirm order ", orderId)
    handleClose();
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
    console.log("handle delivered order ", orderId)
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className='p-10'>
      <Card className='mt-2 '>
      <CardHeader title="All products"/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Update</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminOrder.orders?.map((item,index) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >  
              <TableCell align="left" className="">
                  <AvatarGroup max={3} sx={{justifyContent:"start"}}>
                    {item.orderItems.map((orderItem)=><Avatar src={orderItem.product.imageUrl}></Avatar>)}
                  </AvatarGroup>
              </TableCell>
              <TableCell align='left' scope='row'>
                    {item.orderItems.map((orderItem)=><p> {orderItem.product.title}</p>)}
              </TableCell>
              <TableCell align="left">{item._id}</TableCell>
              <TableCell align="left">{item.totalPrice}</TableCell>
              <TableCell align="left">
                      <span className={`text-white px-5 py-2 rounded-full
                      ${item.orderStatus==="CONFIRMED"?"bg-[#369236]":
                      item.orderStatus==="SHIPPED"?"bg-[#369236]":
                      item.orderStatus==="PLACED"?"bg-[#369236]":
                      item.orderStatus==="PENDING"?"bg-[#369236]":
                      "bg-[#025720]"
                      }`}>
                          {item.orderStatus}
                      </span>
              </TableCell>
              <TableCell align="left">
                  <Button
                    id="basic-button"
                    aria-controls={`basic-menu-${item._id}`}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl[index])}
                    onClick={(event)=>handleClick(event,index)}
                  >
                    Status
                  </Button>
                  <Menu
                    id={`basic-menu-${item._id}`}
                    anchorEl={anchorEl[index]}
                    open={Boolean(anchorEl[index])}
                    onClose={()=>handleClose(index)}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={()=>handleConfirmedOrder(item._id)}>Confirmed Order</MenuItem>
                    <MenuItem onClick={()=>handleShippedOrder(item._id)}>Shipped Order</MenuItem>
                    <MenuItem onClick={()=>handleDeliveredOrder(item._id)}>Delivered Ordery</MenuItem>
                    {/* <MenuItem onClick={handleClose}>Delivered Order</MenuItem> */}
                  </Menu>
              </TableCell>
              <TableCell align="left">
                <button  onClick={()=> handleDeleteOrder(item._id)}  variant='outlined'>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Card>
    </div>
  )
}

export default OrdersTable