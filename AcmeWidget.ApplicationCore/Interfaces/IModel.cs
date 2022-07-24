using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.Interfaces
{
    public abstract class IModel<T>  where T : IEquatable<T>
    {
        protected virtual T Id { get; set; }
    }
}
