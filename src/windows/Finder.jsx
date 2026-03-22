import { WindowControls } from '#components';
import { locations } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper';
import useLocationStore from '#store/location';
import useWindowStore from '#store/window';
import clsx from 'clsx';
import { Search } from 'lucide-react';

const Finder = () => {
    const { openWindow }= useWindowStore();
    const { activeLocation, setActiveLocation } = useLocationStore();

    const openItem = (item)=>{
        if(item.fileType === "pdf") return openWindow("resume");
        if(item.kind === "folder") return setActiveLocation(item);
        if(["fig", "url"].includes(item.fileType) && item.href)
            return window.open(item.href, "blank");
        openWindow(`${item.fileType}${item.kind}`, item);
    };

    const renderList = (name,items)=> (
        <div>
            <h3>{name}</h3>
        <ul>
        {items.map((item)=>(
        <li key={item.id} onClick={()=> setActiveLocation(item)}
        className={clsx(item.id === activeLocation?.id ? "active" : "not-active"
        )}
        >  
        <img src={item.icon} className="w-4" alt={item.name} />
            <p className='text-sm font-medium truncate'>{item.name}</p>
        </li>   
        ))}
        </ul>
    </div>
    );

    
  return (
    <section className="w-[750px] h-[400px] flex flex-col">
        {/* <div id="window-header"> */}
        <div id="window-header" className="flex items-center gap-3 p-2 bg-gray-200">
            <WindowControls target="finder"/>
            <Search className='icon'/>
        </div>

        <div className='bg-white flex h-full'>
            <div className='sidebar'>        
                {renderList('Favorites',Object.values(locations))}
                {renderList('My Projects',locations.work.children)}
            </div>
        

        <ul className="content">
            {activeLocation ?.children.map((item)=>(
                <li key={item.id} className={item.position} onClick={()=> openItem(item)}>
                    <img src={item.icon} alt={item.name} />
                    <p>{item.name}</p>
                </li>
            ))}
        </ul>
        </div>
    </section>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
