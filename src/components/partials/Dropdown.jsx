
const Dropdown = ({title, options , func}) => {
  return (
   
        <div className="select">
             <select defaultValue="0" onChange={func} name="format" id="format">
                <option className='bg-[#141519]' value="0" disabled>
                    {title} 
                </option>
                {options.map((o,i) => (
                    <option className='bg-[#141519] text-zinc-300' key={i} value={o} >
                        {o.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
   
  )
}

export default Dropdown