﻿using System;
using Microsoft.EntityFrameworkCore;

namespace EFTestJob.Models
{
  public class UsersContext : DbContext
  {
    public UsersContext(DbContextOptions<UsersContext> options) : base(options)
    {
      Database.EnsureCreated();
    }
    public DbSet<User> Users {get; set;}
  }
}
