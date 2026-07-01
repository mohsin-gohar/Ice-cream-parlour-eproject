using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ice_Cream_Parlour_Eproject.Data;
using Ice_Cream_Parlour_Eproject.Models;

namespace Ice_Cream_Parlour_Eproject.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class ProductsController : Controller
    {

        private readonly ApplicationDbContext dbcontext;
        private readonly IWebHostEnvironment webHostEnvironment;

        // ✅ Constructor - DbContext aur WebHostEnvironment inject karein
        public ProductsController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment, ApplicationDbContext dbcontext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.dbcontext = context;
        }

        // ============================================================
        // 1️⃣ INDEX - Sab products ki list dikhana
        // ============================================================
        public async Task<IActionResult> Index()
        {
            // ✅ Database se saare recipes (products) fetch karo
            var products = await dbcontext.Recipes.ToListAsync();
            return View(products);
        }

        // ============================================================
        // 2️⃣ CREATE - Naya product add karna (GET)
        // ============================================================
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // ============================================================
        // 3️⃣ CREATE - Naya product save karna (POST)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Recipe recipe, IFormFile? ImageFile)
        {
            // ✅ Validation check
            if (ModelState.IsValid)
            {
                // ✅ Image Upload (agar image select ki hai to)
                if (ImageFile != null && ImageFile.Length > 0)
                {
                    string folder = "images/recipes/";
                    string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(ImageFile.FileName);
                    string fullPath = Path.Combine(webHostEnvironment.WebRootPath, folder, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await ImageFile.CopyToAsync(stream);
                    }
                    recipe.ImagePath = "/" + folder + fileName;
                }

                // ✅ CreatedDate set karo
                recipe.CreatedDate = DateTime.Now;

                // ✅ Database mein add karo
                dbcontext.Recipes.Add(recipe);
                await dbcontext.SaveChangesAsync();

                TempData["Success"] = "Product added successfully!";
                return RedirectToAction(nameof(Index));
            }
            return View(recipe);
        }

        // ============================================================
        // 4️⃣ EDIT - Product edit karna (GET)
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var product = await dbcontext.Recipes.FindAsync(id);
            if (product == null)
                return NotFound();
            return View(product);
        }

        // ============================================================
        // 5️⃣ EDIT - Product update karna (POST)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Recipe recipe, IFormFile? ImageFile)
        {
            if (ModelState.IsValid)
            {
                var existing = await dbcontext.Recipes.FindAsync(recipe.Id);
                if (existing == null)
                    return NotFound();

                // ✅ Sirf allowed fields update karo
                existing.Name = recipe.Name;
                existing.Category = recipe.Category;
                existing.Ingredients = recipe.Ingredients;
                existing.Procedure = recipe.Procedure;
                existing.IsFree = recipe.IsFree;

                // ✅ Agar nayi image select ki hai to update karo
                if (ImageFile != null && ImageFile.Length > 0)
                {
                    string folder = "images/recipes/";
                    string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(ImageFile.FileName);
                    string fullPath = Path.Combine(webHostEnvironment.WebRootPath, folder, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await ImageFile.CopyToAsync(stream);
                    }
                    existing.ImagePath = "/" + folder + fileName;
                }

                // ✅ Database update karo
                await dbcontext.SaveChangesAsync();

                TempData["Success"] = "Product updated successfully!";
                return RedirectToAction(nameof(Index));
            }
            return View(recipe);
        }

        // ============================================================
        // 6️⃣ DELETE - Product delete karna (POST)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await dbcontext.Recipes.FindAsync(id);
            if (product != null)
            {
                dbcontext.Recipes.Remove(product);
                await dbcontext.SaveChangesAsync();
                TempData["Success"] = "Product deleted successfully!";
            }
            return RedirectToAction(nameof(Index));
        }
    }
}