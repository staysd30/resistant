package sdsu;

import java.util.ArrayList;
 
 
public class CartBean {
 private ArrayList myCartProducts = new ArrayList();
 private double myOrderTotal,myOrderTax ;
 private int myProductCount; ////////
 public int getLineProductsCount() {
  return myCartProducts.size();
 }
  
 public void deleteCartProduct(String strProductIndex) {
  int productIndex = 0;
  try {
   productIndex = Integer.parseInt(strProductIndex);
   myCartProducts.remove(productIndex - 1);
   calculateOrderTotal();
   calculateProductCount();
  } catch(NumberFormatException nfe) {
   System.out.println("Error while deleting cart item: "+nfe.getMessage());
   nfe.printStackTrace();
  }
 }
  
 public void updateCartProduct(String strProductIndex, String strQuantity) {
  float totalcost = 0;
  float cost = 0;
  int quantity = 0;
  int productIndex = 0;
  CartProductBean cartProduct = null;
  try {
   productIndex = Integer.parseInt(strProductIndex);
   quantity = Integer.parseInt(strQuantity);
   if(quantity>0) {
    cartProduct = (CartProductBean)myCartProducts.get(productIndex-1);
    cost = cartProduct.getCost();
    totalcost = cost*quantity;
    cartProduct.setQuantity(quantity);
    cartProduct.setTotalCost(totalcost);
    calculateOrderTotal();
	calculateProductCount();
   }
  } catch (NumberFormatException nfe) {
   System.out.println("Error while updating cart: "+nfe.getMessage());
   nfe.printStackTrace();
  }
   
 }
  
 public void addCartProduct(String sku, String category,
String vendor,String model,String description,String features,String image,String unitCost,String retail,String message, String strQuantity) {
  float totalcost = 0;
  float cost = 0;
  int quantity = 0;
  CartProductBean cartProduct = new CartProductBean();
  try {
   cost = Float.parseFloat(retail);
   quantity = Integer.parseInt(strQuantity);
   if(quantity>0) {
    totalcost = cost*quantity;
    cartProduct.setSku(sku);
	cartProduct.setCategory(category);
	cartProduct.setVendor(vendor);
	cartProduct.setFeatures(features);
	cartProduct.setImage(image);
	cartProduct.setMessage(message);
    cartProduct.setDescription(description);
    cartProduct.setCost(cost);
    cartProduct.setQuantity(quantity);
    cartProduct.setTotalCost(totalcost);
    myCartProducts.add(cartProduct);
    calculateOrderTotal();
	calculateProductCount();
   }
    
  } catch (NumberFormatException nfe) {
   System.out.println("Error while parsing from String to primitive types: "+nfe.getMessage());
   nfe.printStackTrace();
  }
 }
 
 public void addAlreadyCart(int productIndex1, int quantity1) {
  float totalcost = 0;
  float cost = 0;
  int quantity = quantity1;
  int productIndex = productIndex1;
  CartProductBean cartProduct = null;
  try {
   if(quantity>0) {
    cartProduct = (CartProductBean)myCartProducts.get(productIndex);
    cost = cartProduct.getCost();
    totalcost = cost*quantity;
    cartProduct.setQuantity(quantity);
    cartProduct.setTotalCost(totalcost);
    calculateOrderTotal();
	calculateProductCount();
   }
  } catch (NumberFormatException nfe) {
   System.out.println("Error while updating cart: "+nfe.getMessage());
   nfe.printStackTrace();
  }
   
 }
 
 
  
 public void addCartProduct(CartProductBean cartProduct) {
  myCartProducts.add(cartProduct);
 }
  
 public CartProductBean getCartProduct(int productIndex) {
  CartProductBean cartProduct = null;
  if(myCartProducts.size()>productIndex) {
   cartProduct = (CartProductBean) myCartProducts.get(productIndex);
  }
  return cartProduct;
 }
  
 public ArrayList getCartProducts() {
  return myCartProducts;
 }
 public void setCartProducts(ArrayList myCartProducts) {
  this.myCartProducts = myCartProducts;
 }
 public double getOrderTotal() {
  return myOrderTotal;
 }
 public void setOrderTotal(double myOrderTotal) {
  this.myOrderTotal = myOrderTotal;
 }
 
 public double getOrderTax() {
  return myOrderTax;
 }
 public void setOrderTax(double myOrderTax) {
  this.myOrderTax = myOrderTax;
 }
 
 
 public int getProductCount() {
  return myProductCount;
 }
 public void setProductCount(int myProductCount) {
  this.myProductCount = myProductCount;
 }
  
 protected void calculateOrderTotal() {
  double dblTotal = 0;
  double helperT=0;
  for(int counter=0;counter<myCartProducts.size();counter++) {
   CartProductBean cartProduct = (CartProductBean) myCartProducts.get(counter);
   dblTotal+=cartProduct.getTotalCost();
    
  }
  dblTotal=dblTotal+5;
  helperT=(dblTotal*.08);
  dblTotal=dblTotal+helperT;
  setOrderTotal(dblTotal);
  setOrderTax(helperT);
 }
 
 protected void calculateProductCount() {
  int itTotal = 0;
  
  for(int counter=0;counter<myCartProducts.size();counter++) {
   CartProductBean cartProduct = (CartProductBean) myCartProducts.get(counter);
   itTotal+=cartProduct.getQuantity();
    
  }
  
  setProductCount(itTotal);
 }
 
 
 
}