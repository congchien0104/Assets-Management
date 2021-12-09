using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.ExtensionMethods
{
    public static class IQueryableExtensions
    {
        public static IQueryable<TSource> Paged<TSource>(this IQueryable<TSource> source, int page, int pageSize)
        {
            return source.Skip((page - 1) * pageSize).Take(pageSize);
        }
        public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, bool>> predicate)
        {
            if (condition)
            {
                return query.Where(predicate);
            }
            return query;
        }
        public static IQueryable<TSource> OrderByIf<TSource, TKey>(this IQueryable<TSource> query, bool condition, Expression<Func<TSource, TKey>> keySelector, bool ascending)
        {
            if (condition)
            {
                return ascending ? query.OrderBy(keySelector) : query.OrderByDescending(keySelector);
            }
            return query;
        }
        public static IQueryable<TSource> SetPriority<TSource, TKey1, TKey2>(this IQueryable<TSource> query, bool condition, 
            Expression<Func<TSource, TKey1>> firstKeySelector, Expression<Func<TSource, TKey2>> secondKeySelector)
        {
            if (condition)
            {
                var topElement = query.OrderByDescending(firstKeySelector).Take(1);
                return topElement.Concat(query.OrderBy(secondKeySelector).Except(topElement));
            }
            return query;
        }
    }
}
