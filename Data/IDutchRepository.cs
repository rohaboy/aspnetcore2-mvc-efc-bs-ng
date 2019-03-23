using System.Collections.Generic;
using DutchTreat.Data.Entities;

namespace DutchTreat.Data
{
    public interface IDutchRepository
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetProductsByCategory(string category);

        IEnumerable<Order> GetAllOrders(bool includeOrders);
        Order GetOrderById(string username,int id);
        IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems);
        void AddOrder(Order newOrder);

        bool SaveAll();
        void AddEntity(object model);
        
    }   
}