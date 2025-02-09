import React, {useState } from 'react'

interface UserData {
  name: string;
  email: string;
  role: string;
}

function dev() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [courseType, setCourseType] = useState("PHOTO");
    const [courseTier, setCourseTier] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ส่งข้อมูลไปยัง API Route ที่ /api/course ด้วย method POST
      const res = await fetch("/api/course/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, courseType, courseTier })
      });

      if (!res.ok) {
        throw new Error("เกิดข้อผิดพลาดในการเพิ่มคอร์ส");
      }

      const data = await res.json();
      alert("เพิ่มคอร์สเรียบร้อยแล้ว!");
      // หลังจากเพิ่มคอร์สแล้วคุณอาจต้องการ redirect ไปยังหน้ารายละเอียดคอร์สหรือหน้าจัดการ lesson
    } catch (error:any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <div className='mt-10 ml-5'>
            {/* Course */}
            <div className=''>
                <h1 className='font-bold mb-5 text-white text-xl'>Add Course</h1>
                <div className='flex border-white border rounded-xl gap-5 p-5 overflow-x-scroll'>

                    <form onSubmit={handleSubmit} className='w-[300px] flex-shrink-0 duration-300 hover:scale-105 relative rounded-2xl h-[400px] bg-gray-700'>
                        {/* Header */}
                        <div className='h-[50%] shadow-red-600 flex justify-center items-center shadow-md bg-red-600 rounded-t-xl'>
                            <input 
                                value={courseTier}
                                type='text'
                                onChange={(e) => setCourseTier(e.target.value)}
                                className='font-bold text-white shadow-lg max-w-[80%] shadow-white border-2 px-4 py-2 rounded-full text-3xl bg-transparent'
                                placeholder='Corse Tier 1'
                            />
                        </div>
                        {/* Body */}
                        <div className='h-[50%] text-white overflow-hidden p-5'>
                            <div className='flex justify-between'>
                                <input 
                                    value={title}
                                    type='text'
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='font-bold text-white w-[160px] text-md bg-transparent'
                                    placeholder='Photo learning'
                                />
                                <select
                                  id="courseType"
                                  value={courseType}
                                  onChange={(e) => setCourseType(e.target.value)}
                                  className="photo-bg items-center flex rounded-lg w-fit px-1 font-medium text-center text-sm bg-transparent appearance-none"
                                >
                                  <option value="PHOTO">PHOTO</option>
                                  <option value="MEDIA">MEDIA</option>
                                  <option value="GRAPHIC">GRAPHIC</option>
                                  <option value="DATA">DATA</option>
                                  <option value="LIVE">LIVE</option>
                                  <option value="NETWORK">NETWORK</option>
                                  <option value="UNIVERSAL">UNIVERSAL</option>
                                </select>
                            </div>

                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo vitae dolor minima architecto. "
                                className='text-gray-400 resize-none w-[90%] h-[80px] bg-transparent text-start overflow-hidden mt-2 text-sm'
                                required 
                            />

                            <hr className='border-red-500 absolute bottom-16 w-[90%] flex left-[50%] translate-x-[-50%]'/>

                            <div className='flex justify-between'>
                                <p className='absolute bottom-5 text-red-500 font-bold'>0% Complete</p>
                                <button
                                    type='submit' 
                                    disabled={isSubmitting}
                                    className='hover:scale-105 hover:bg-red-500 hover:bg-opacity-20 hover:border-red-300 duration-300 absolute bottom-5 right-5 text-red-500 border rounded-3xl px-6 border-red-500 font-medium py-0.5'
                                >
                                {isSubmitting ? "Submiting" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default dev
