package sdsu;



public class ShippingBean implements java.io.Serializable
{
    private String name,address1,address2,city,state,zipcode,phone;

    public ShippingBean()
    {
    }
    public ShippingBean(String name, String address1, String address2,String city, String state, String zipcode,String phone) {
		this.name = name;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.zipcode = zipcode;
		this.phone = phone;
		
		
		}
    public String getName() { return name; }
    public void setName(String s) { name = s; }

    public String getAddress1() { return address1; }
    public void setAddress1(String s)
        { address1 = s; }

    public String getAddress2() { return address2; }
    public void setAddress2(String s)
        { address2 = s; }

    public String getCity() { return city; }
    public void setCity(String s) { city = s; }

    public String getState() { return state; }
    public void setState(String s) { state = s; }

    public String getZipcode() { return zipcode; }
    public void setZipcode(String s)
        { zipcode = s; }

    public String getPhone() { return phone; }
    public void setPhone(String s) { phone = s; }
}
