import type { Item } from '../types/Item';

export function Card({ item }: { item: Item }) {
  return (
    <div className="card bg-base-100 shadow-sm opacity-0 animate-fade-in overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <figure className="h-48 w-full bg-base-200 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          
        />
      </figure>
      <div className="card-body p-5 text-left">
        <h3 className="card-title text-base md:text-lg">{item.name}</h3>
        <p className="text-sm md:text-[0.925rem] leading-relaxed opacity-80">{item.description}</p>
        <div className="mt-4 text-xs opacity-70 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <i className="far fa-calendar"></i>
            {new Date(item.date).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="fas fa-map-marker-alt"></i>
            {item.location}
          </span>
        </div>
      </div>
    </div>
  );
}
