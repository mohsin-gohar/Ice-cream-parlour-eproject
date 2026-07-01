using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ice_Cream_Parlour_Eproject.Areas.Admin.Controllers
{
    public class CatagoryController : Controller
    {
        // GET: CatagoryController
        public ActionResult Index()
        {
            return View();
        }

        // GET: CatagoryController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CatagoryController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CatagoryController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CatagoryController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CatagoryController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CatagoryController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: CatagoryController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
