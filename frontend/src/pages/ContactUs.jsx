import toast from 'react-hot-toast';
import ContactMap from '../components/ContactMap'

const ContactUs = () => {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "4632adde-e16a-4b11-a7c6-f867c6f6784b");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      toast.success("Your Message sent successfully")
      formData("")
    }
  };

  return (
    <div className="h-screen w-full px-5 md:px-20 py-20 flex justify-center">
      <div className='flex gap-10 md:gap-20 items-start '>
          <form  className='flex flex-col gap-5 w-[400px]' onSubmit={onSubmit}>
            <input name='name' type="text" className='border border-slate-400 px-4 py-2.5 rounded-md ' placeholder='name@gmail.com' />
            <input name="email" type="text" className='border border-slate-400 px-4 py-2.5 rounded-md ' placeholder='YourEmail@gmail.com' />
            <textarea name='message' type="text" rows={6} className='border border-slate-400 px-4 py-2.5 rounded-md ' placeholder='Enter Your Message' />
            <button type='submit' className='px-4 py-3 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white'>Send Message</button>
          </form>
        {/* map  */}
        <div className='w-[600px]'>
          <ContactMap />
        </div>
      </div>
    </div>
  )
}

export default ContactUs