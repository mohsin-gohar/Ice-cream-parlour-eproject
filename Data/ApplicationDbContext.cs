using Microsoft.AspNetCore.Identity.EntityFrameworkCore;  
using Microsoft.EntityFrameworkCore;
using Ice_Cream_Parlour_Eproject.Models;

namespace Ice_Cream_Parlour_Eproject.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) 
        {
        }
        // ===== DbSet Properties (nullable initialize karein) =====
        public DbSet<Recipe> Recipes { get; set; } = null!;
        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<Feedback> Feedbacks { get; set; } = null!;
        public DbSet<UserRecipe> UserRecipes { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // ===== RECIPES =====
            modelBuilder.Entity<Recipe>().HasData(
                new Recipe
                {
                    Id = 1,
                    Name = "Vanilla Ice Cream",
                    Category = "Classic",
                    Ingredients = "Fresh cream, vanilla extract, sugar, milk",
                    Procedure = "1. Mix all ingredients. 2. Churn in ice cream maker. 3. Freeze for 4 hours.",
                    ImagePath = "/images/recipes/vanilla.jpg",
                    IsFree = true,
                    CreatedDate = DateTime.Now
                },
                new Recipe
                {
                    Id = 2,
                    Name = "Chocolate Ice Cream",
                    Category = "Classic",
                    Ingredients = "Fresh cream, cocoa powder, sugar, milk",
                    Procedure = "1. Mix cocoa with sugar. 2. Add cream and milk. 3. Churn and freeze.",
                    ImagePath = "/images/recipes/chocolate.jpg",
                    IsFree = true,
                    CreatedDate = DateTime.Now
                },
                new Recipe
                {
                    Id = 3,
                    Name = "Strawberry Ice Cream",
                    Category = "Fruit",
                    Ingredients = "Fresh strawberries, cream, sugar, milk",
                    Procedure = "1. Blend strawberries. 2. Mix with cream and sugar. 3. Churn and freeze.",
                    ImagePath = "/images/recipes/strawberry.jpg",
                    IsFree = false,
                    CreatedDate = DateTime.Now
                }
            );

            // ===== BOOKS =====
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Title = "The Art of Ice Cream Making",
                    Author = "Chef John Doe",
                    Description = "Learn the secrets of making perfect ice cream at home with 50+ recipes.",
                    Price = 29.99m,
                    ImagePath = "/images/books/book1.jpg",
                    StockQuantity = 50
                },
                new Book
                {
                    Id = 2,
                    Title = "Gourmet Ice Cream Recipes",
                    Author = "Chef Jane Smith",
                    Description = "Premium ice cream recipes for special occasions.",
                    Price = 39.99m,
                    ImagePath = "/images/books/book2.jpg",
                    StockQuantity = 35
                }
            );
        }
    }
}