using AcmeWidget.ApplicationCore;
using AcmeWidget.ApplicationCore.Interfaces;
using AcmeWidget.ApplicationCore.Models;
using AcmeWidget.Infrastructure.EFCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.Infrastructure.Repository
{
    public class ActivityRepository : IRepository<Activity>
    {
        private readonly AcmeWidgetContext _context;

        public ActivityRepository(AcmeWidgetContext context)
        {
            _context = context;
        }
        public async Task<Either<Activity, string>> CreateAsync(Activity model)
        {
            try
            {
                var activity = _context.Activities.Add(model);
                await _context.SaveChangesAsync();
                return new Either<Activity, string>(activity.Entity);
            }catch (Exception ex)
            {
                return new Either<Activity, string>(ex.Message);
            }
        }

        public async Task<Either<int, string>> DeleteAsync(int id)
        {
            try
            {
                var activity = _context.Activities.SingleOrDefault(x => x.ActivityId == id);
                if (activity != null)
                {
                    _context.Activities.Remove(activity);
                    var result = await _context.SaveChangesAsync();
                    return new Either<int, string>(result);
                }
                return new Either<int, string>("Activity Not Found!");
            }
            catch (Exception ex)
            {
                return new Either<int, string>(ex.Message);
            }
        }

        public Either<IEnumerable<Activity>, string> GetAll()
        {
            try
            {
                var result = _context.Activities.ToList().AsEnumerable();
                return new Either<IEnumerable<Activity>, string>(result);
            }
            catch (Exception ex)
            {
                return new Either<IEnumerable<Activity>, string>(ex.Message);
            }
        }

        public async Task<Either<Activity, string>> GetAsync(int id)
        {
            try
            {
                var activity = await _context.Activities.FindAsync(id);
                if (activity != null)
                {
                    return new Either<Activity, string>(activity);
                }
                return new Either<Activity, string>("Activity Not Found!");
            }
            catch (Exception ex)
            {
                return new Either<Activity, string>(ex.Message);
            }
        }

        public async Task<Either<int, string>> UpdateAsync(Activity model)
        {
            try
            {
                var activity = _context.Activities.Update(model);
                var result = await _context.SaveChangesAsync();
                return new Either<int, string>(result);
            }
            catch (Exception ex)
            {
                return new Either<int, string>(ex.Message);
            }
        }
    }
}
