package sdsu;

public class CartProductBean implements java.io.Serializable {
	private String sku, category, vendor, model, description,
		features, image,message;
	private float cost, retail,totalcost;
	private int quantity;
	public CartProductBean() {}
	public CartProductBean(String sku, String category, String vendor,
		String model, String description, String features,
		String image, float cost, float retail, String message,float totalcost,int quantity) {
		this.sku = sku;
		this.category = category;
		this.vendor = vendor;
		this.model = model;
		this.description = description;
		this.features = features;
		this.image = image;
		this.cost = cost;
		this.retail = retail;
		this.message = message;
		this.totalcost = totalcost;
		this.quantity = quantity;
		}
		
	public String getSku() { return sku; }
	public String getCategory() { return category; }
	public String getVendor() { return vendor; }
	public String getModel() { return model; }
	public String getDescription() { return description; }
	public String getFeatures() { return features; }
	public String getImage() { return image; }
	public float getCost() { return cost; }
	public float getRetail() { return retail; }
	public String getMessage() { return message; }
	public float getTotalCost() { return totalcost; }
	public int getQuantity(){return quantity;}
	
	public void setSku(String s) { sku = s; }
	public void setCategory(String s) { category = s; }
	public void setVendor(String s) { vendor = s; }
	public void setModel(String s) { model = s; }
	public void setDescription(String s) { description = s; }
	public void setFeatures(String s) { features = s; }
	public void setImage(String s) { image = s; }
	public void setCost(float c) { cost = c; }
	public void setRetail(float r) { retail = r; }  
	public void setMessage(String s) { message = s; }
	public void setTotalCost(float t) {totalcost =t; }
	public void setQuantity(int q){quantity =q;}
	}
