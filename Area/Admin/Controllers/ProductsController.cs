using Ice_Cream_Parlour_Eproject.Helpers;        
using Ice_Cream_Parlour_Eproject.Services;       
using Ice_Cream_Parlour_Eproject.ViewModels;     
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

    public async Task<IActionResult> Index(string? search, int? categoryId, int page = 1)
    {
        ViewData["Title"] = "Products";
        return View(await _productService.GetPagedAsync(search, categoryId, page, 10));
    }

    public async Task<IActionResult> Create()
    {
        ViewData["Title"] = "Add Product";
        var model = new ProductViewModel();
        ViewBag.Categories = await _productService.GetCategoriesAsync();
        return View(model);
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(ProductViewModel model)
    {
        ViewBag.Categories = await _productService.GetCategoriesAsync();
        if (!ModelState.IsValid) return View(model);

        await _productService.CreateAsync(model, HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>());
        TempData["Success"] = "Product created successfully.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var model = await _productService.GetByIdAsync(id);
        if (model == null) return NotFound();
        ViewData["Title"] = "Edit Product";
        ViewBag.Categories = await _productService.GetCategoriesAsync();
        return View(model);
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(ProductViewModel model)
    {
        ViewBag.Categories = await _productService.GetCategoriesAsync();
        if (!ModelState.IsValid) return View(model);

        if (!await _productService.UpdateAsync(model, HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>()))
            return NotFound();

        TempData["Success"] = "Product updated successfully.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    [Authorize(Roles = AppRoles.AdminOrManager)]
    public async Task<IActionResult> Delete(int id)
    {
        await _productService.DeleteAsync(id, HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>());
        TempData["Success"] = "Product deleted.";
        return RedirectToAction(nameof(Index));
    }
}
