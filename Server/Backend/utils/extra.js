{
 private double baseSalary; // base salary per week
 
  // six-argument constructor
public BasePlusCommissionEmployee(String firstName, String lastName,
String socialSecurityNumber, double grossSales,
double commissionRate, double baseSalary)
{
 
 
 
 
  if (baseSalary < 0.0)
  throw new IllegalArgumentException(
"Base salary must be >= 0.0");
 Fig. 9.8 | private superclass members cannot be accessed in a subclass. (Part 1 of 3.)
 public class BasePlusCommissionEmployee extends CommissionEmployee
 // explicit call to superclass CommissionEmployee constructor
 super(firstName, lastName, socialSecurityNumber,
  grossSales, commissionRate); 
 9.4 Relationship Between Superclasses and Subclasses 377
this.baseSalary = baseSalary;
}
// set base salary
public void setBaseSalary(double baseSalary)
{
if (baseSalary < 0.0)
throw new IllegalArgumentException(
"Base salary must be >= 0.0");
this.baseSalary = baseSalary;
}
// return base salary
public double getBaseSalary()
{
return baseSalary;
}
 
  // calculate earnings
 
  public double earnings()
 {
 
 
  }
 
  // return String representation of BasePlusCommissionEmployee
 50
 51 public String toString()
 52 {
 53
 54
 55
 56
 57
 58
 59
 60 }
 61 } // end class BasePlusCommissionEmployee
 