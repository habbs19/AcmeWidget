using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.Interfaces
{
    public interface IRepository<T> where T : IModel<int> 
    {
        Task<Either<T, string>> GetAsync(int id);
        Either<IEnumerable<T>,string> GetAll();
        Task<Either<T,string>> CreateAsync(T model);
        Task<Either<int, string>> DeleteAsync(int id);
        Task<Either<int,string>> UpdateAsync(T model);


    }
}
