using AcmeWidget.ApplicationCore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.Infrastructure.EFCore 
{ 
    public partial class AcmeWidgetContext : DbContext
    {
        public AcmeWidgetContext()
        {
        }
        public AcmeWidgetContext(DbContextOptions<AcmeWidgetContext> options)
            : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; } = null!;
        public DbSet<Employee> Employees { get; set; } = null!;
        public DbSet<ActivityForm> ActivityForm { get; set; } = null!;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseSqlServer(optionsBuil);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");
            modelBuilder.Entity<Activity>(entity =>
            {
                entity.ToTable(nameof(Activity));
                entity.Property(e => e.ActivityId).HasColumnName(nameof(Activity.ActivityId));
                entity.HasOne(e => e.Form).WithOne(a=>a.Activity).HasForeignKey("Activity");
            });
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable(nameof(Employee));
                entity.Property(e => e.EmployeeId).HasColumnName(nameof(Employee.EmployeeId));
                entity.Property(e => e.FirstName).HasColumnName(nameof(Employee.FirstName));
                entity.HasOne(e => e.Form).WithOne(a => a.Employee).HasForeignKey("Employee");
            });
            modelBuilder.Entity<ActivityForm>(entity =>
            {
                entity.ToTable(nameof(ActivityForm));
                entity.HasKey(e => e.FID);
                entity.Property(e => e.FID).HasColumnName(nameof(ApplicationCore.Models.ActivityForm.FID)).UseIdentityColumn();
                entity.Property(e => e.Comments).HasColumnName(nameof(ApplicationCore.Models.ActivityForm.Comments));
                entity.Property(e => e.CreatedDate).HasColumnName(nameof(ApplicationCore.Models.ActivityForm.CreatedDate)).HasDefaultValueSql("GETDATE()");
                entity.HasOne(e => e.Activity).WithOne(a=>a.Form).OnDelete(DeleteBehavior.ClientCascade);
                entity.HasOne(e => e.Employee).WithOne(a=>a.Form).OnDelete(DeleteBehavior.ClientCascade);
            });
            OnModelCreatingPartial(modelBuilder);
            SeedDataInsert(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
        private void SeedDataInsert(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<ActivityForm>()
            //    .HasData(new ActivityForm
            //    {
            //        Activity = new Activity
            //        {
            //            ActivityId = 1,
            //            Type = Activity.ActivityType.MountainClimbing
            //        },
            //        Employee = new Employee
            //        {
            //            EmployeeId = 1,
            //            FirstName = "Michael",
            //            LastName = "Jackson",
            //            EmailAddress = "mj@gmail.com"
            //        },
            //        Comments = "Thriller!",
            //        FID = 1,
            //    });
          
        }
    } 
}
