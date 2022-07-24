using AcmeWidget.ApplicationCore;
using AcmeWidget.ApplicationCore.Interfaces;
using AcmeWidget.ApplicationCore.Models;
using AcmeWidget.Infrastructure.EFCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AcmeWidget.Infrastructure.Repository
{
    public class ActivityFormRepository : IRepository<ActivityForm>
    {
        private readonly AcmeWidgetContext _context;

        public ActivityFormRepository(AcmeWidgetContext context)
        {
            _context = context;
        }

        public async Task<Either<ActivityForm, string>> CreateAsync(ActivityForm model)
        {
            try
            {
                var emp = await _context.Employees.FirstOrDefaultAsync(e=> e.EmailAddress == model.Employee.EmailAddress);
                if(emp != null)
                {
                    return new Either<ActivityForm, string>("You have already registered!");
                }
                var form = await _context.ActivityForm.AddAsync(model);
                await _context.SaveChangesAsync();
                return new Either<ActivityForm, string>(form.Entity);
            }
            catch (Exception ex)
            {
                return new Either<ActivityForm, string>(ex.Message);
            }
        }

        public Task<Either<int, string>> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Either<IEnumerable<ActivityForm>, string> GetAll()
        {
            try
            {
                var result = _context.Set<ActivityForm>()
                    .Include(e => e.Employee)
                    .Include(a => a.Activity)
                    .ToList();
                return new Either<IEnumerable<ActivityForm>, string>(result);
            }
            catch (Exception ex)
            {
                return new Either<IEnumerable<ActivityForm>, string>(ex.Message);
            }
        }

        public async Task<Either<ActivityForm, string>> GetAsync(int id)
        {
            try
            {
                var activity = await _context.Set<ActivityForm>()
                    .Include(e => e.Employee)
                    .Include(a => a.Activity)
                    .FirstOrDefaultAsync(e=> e.FID == id);
                if (activity != null)
                {
                    return new Either<ActivityForm, string>(activity);
                }
                return new Either<ActivityForm, string>("Registration Not Found!");
            }
            catch (Exception ex)
            {
                return new Either<ActivityForm, string>(ex.Message);
            }
        }

        public Task<Either<int, string>> UpdateAsync(ActivityForm model)
        {
            throw new NotImplementedException();
        }
    }
}
