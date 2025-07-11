import CategoryItemCard from '@/components/CategoryItemCard'
const Suggestions = ({relatedItems})=>{
    return(
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
                        {relatedItems?.map((item) => (
                          <CategoryItemCard key={item.id} item={item} />
                        ))}
                      </div>
    )
}
export default Suggestions;