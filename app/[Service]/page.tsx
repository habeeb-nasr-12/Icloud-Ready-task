

export default function Service({ params }: { params: { Service: string } }) {
 
  
    return (
         <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#fff] to-[#caeff9]"> 

         <h2 className="text-[64px] "> Welcome to {params.Service} </h2>
    </div>

    )


}