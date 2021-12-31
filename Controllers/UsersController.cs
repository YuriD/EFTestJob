using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EFTestJob.Models;

namespace EFTestJob.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersContext db;
        public UsersController(UsersContext context)
        {
          db = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          return await db.Users.OrderBy(u => u.UserId).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await db.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            if (DateTime.Compare(user.DReg, user.DLastAct) > 0)
            {
              ModelState.AddModelError("dlastact", "Date last activity must be greater");
            }
            if(!ModelState.IsValid) return BadRequest(ModelState);

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user); //NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (UserExists(user.UserId))
          {
            ModelState.AddModelError("userid", "User already exist");
          }
          if (DateTime.Compare(user.DReg, user.DLastAct) > 0)
          {
            ModelState.AddModelError("dlastact", "Date last activity must be greater");
          }
          if(!ModelState.IsValid) return BadRequest(ModelState);
          db.Users.Add(user);
          await db.SaveChangesAsync();
          return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
    }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return db.Users.Any(e => e.UserId == id);
        }
    }
}
