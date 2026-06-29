using Ice_Cream_Parlour_Eproject.Models;
using Ice_Cream_Parlour_Eproject.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Ice_Cream_Parlour_Eproject.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>  
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)  
        {
        }

        public DbSet<Customer> Customers { get; set; } = null!;  
        public DbSet<Product> Products { get; set; } = null!;    
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;   
        public DbSet<Recipe> Recipes { get; set; } = null!;
        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Feedback> Feedbacks { get; set; } = null!;
        public DbSet<UserRecipe> UserRecipes { get; set; } = null!;

    }
}