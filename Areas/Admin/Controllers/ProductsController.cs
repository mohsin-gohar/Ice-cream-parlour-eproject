using Ice_Cream_Parlour_Eproject.Helpers;
using Ice_Cream_Parlour_Eproject.Models;
using Ice_Cream_Parlour_Eproject.Models.Entities;
using Ice_Cream_Parlour_Eproject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ice_Cream_Parlour_Eproject.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = AppRoles.AllStaff)]
public class ProductsController : Controller
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    // ===== INDEX =====
    public async Task<IActionResult> Index(string? search, int? categoryId, int page = 1)
    {
        ViewData["Title"] = "Products";
        var model = await _productService.GetPagedAsync(search, categoryId, page, 10);
        return View(model);
    }

    // ===== CREATE (GET) =====
    public async Task<IActionResult> Create()
    {
        ViewData["Title"] = "Add Product";

        // ✅ Generate next product code (e.g., 001, 002, ...)
        var lastProduct = await _productService.GetLastProductAsync();
        int nextNumber = 1;
        if (lastProduct != null && !string.IsNullOrEmpty(lastProduct.ProductCode))
        {
            if (int.TryParse(lastProduct.ProductCode, out int lastNum))
                nextNumber = lastNum + 1;
        }
        string productCode = nextNumber.ToString("D3");

        var model = new ProductViewModel
        {
            ProductCode = productCode
        };

        ViewBag.Categories = await _productService.GetCategoriesAsync();
        return View(model);
    }

    // ===== CREATE (POST) =====
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(ProductViewModel model)
    {
        ViewBag.Categories = await _productService.GetCategoriesAsync();

        if (!ModelState.IsValid)
        {
            return View(model);
        }

        try
        {
            await _productService.CreateAsync(model, HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>());
            TempData["Success"] = "Product created successfully!";
            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {
            ModelState.AddModelError("", $"Error: {ex.Message}");
            return View(model);
        }
    }

    // ===== EDIT (GET) =====
    public async Task<IActionResult> Edit(int id)
    {
        var model = await _productService.GetByIdAsync(id);
        if (model == null) return NotFound();

        ViewData["Title"] = "Edit Product";
        ViewBag.Categories = await _productService.GetCategoriesAsync();
        return View(model);
    }

    // ===== EDIT (POST) =====
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(ProductViewModel model)
    {
        ViewBag.Categories = await _productService.GetCategoriesAsync();

        if (!ModelState.IsValid)
        {
            return View(model);
        }

        try
        {
            if (!await _productService.UpdateAsync(model, HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>()))
            {
                return NotFound();
            }

            TempData["Success"] = "Product updated successfully!";
            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {
            ModelState.AddModelError("", $"Error: {ex.Message}");
            return View(model);
        }
    }

    // ===== DELETE =====
    [HttpPost]
    [ValidateAntiForgeryToken]
    [Authorize(Roles = AppRoles.AdminOrManager)]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _productService.DeleteAsync(id, HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>());
            TempData["Success"] = "Product deleted successfully!";
        }
        catch (Exception ex)
        {
            TempData["Error"] = $"Delete failed: {ex.Message}";
        }

        return RedirectToAction(nameof(Index));
    }
}