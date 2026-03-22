// import { WindowControls } from "#components"
// import WindowWrapper from "#hoc/WindowWrapper"
// import { ChevronLeft, ChevronRight, Copy, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

// const Safari = () => {
//   return (
//     <>
//       <div id="window-header">
//         <WindowControls target="safari"/>

//         <PanelLeft className="ml-10 icon"/>

//         <div className="flex items-center gap-1 ml-5">
//             <ChevronLeft className="icon"/>
//             <ChevronRight className="icon"/>
//         </div>

//         <div className="flex-1 flex-center gap-3">
        
//             <ShieldHalf className="icon"/>

//             <div className="search">
//                 <Search className="icon"/>

//                 <input type="text" 
//                 placeholder="Search or enter website name" className="flex-1"/>
//             </div>
//         </div>

//         <div className="flex items-center gap-5">
//             <Share className="icon"/>
//             <Plus className="icon"/>
//             <Copy className="icon"/>
//         </div>

//       </div>
//     </>
//   )
// }

// const SafariWindow = WindowWrapper(Safari, "safari");

// export default SafariWindow;







import { WindowControls } from "#components"
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper"
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

const Safari = () => {
  return (
    // 🔥 CHANGE 1: Added parent container for auto-sizing
    // <section className="flex flex-col w-fit h-fit min-w-[600px]">
    <section className="flex flex-col w-fit h-fit min-w-[600px]">

      <div id="window-header" className="flex items-center gap-3 p-2 bg-gray-200">

        <WindowControls target="safari"/>

        <PanelLeft className="ml-6 icon cursor-pointer"/>

        <div className="flex items-center gap-1 ml-3">
          <ChevronLeft className="icon cursor-pointer"/>
          <ChevronRight className="icon cursor-pointer"/>
        </div>

        <div className="flex-1 flex items-center justify-center gap-3">
          <ShieldHalf className="icon"/>

          {/* <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 w-full max-w-md"> */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 w-full min-w-[600px]">
            <Search className="icon"/>

            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon cursor-pointer"/>
          <Plus className="icon cursor-pointer"/>
          <Copy className="icon cursor-pointer"/>
        </div>

      </div>

      <div className="blog">
        <h2>My Developer Blog</h2>
        <div className="blog">
            {blogPosts.map(({ id, image, title, date, link })=>(
                <div key={id} className="blog-post">
                    <div className="col-span-2">
                        <img src={image} alt={title} />
                    </div>
                    <div className="content">
                        <p>{date}</p>
                        <h3>{title}</h3>
                        <a href={link} target="_blank" rel="noopener norreferrer">
                            Check out the full post <MoveRight className="icon-hover"/>
                        </a>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </section>
  )
}

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;

