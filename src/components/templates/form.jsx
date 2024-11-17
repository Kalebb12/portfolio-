import SocialLinks from "../common/socialLinks";
const ContactForm = () => {
    return ( 
        <form action={import.meta.env.VITE_FORMSPREE_API} method="POST" className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Your name"
              required
              name="Name"
              className="xl:w-[500px] w-full h-[56px] hover:border-[var(--neutral)] focus:shadow-focusShadow hover:bg-[var(--zinc-100)] py-4 rounded outline-none px-6 border-[1.4px] border-black"
            />
            <input
              type="email"
              required
              placeholder="Email"
              name="Email"
              className="xl:w-[500px] w-full h-[56px] hover:border-[var(--neutral)] focus:shadow-focusShadow hover:bg-[var(--zinc-100)] py-4 rounded outline-none px-6 border-[1.4px] border-black"
            />
            <input
              type="url"
              placeholder="Your website (If exists [https://]) "
              name="Website"
              className="xl:w-[500px] w-full h-[56px] hover:border-[var(--neutral)] focus:shadow-focusShadow hover:bg-[var(--zinc-100)] py-4 rounded outline-none px-6 border-[1.4px] border-black"
            />
            <textarea
              placeholder="How can I help?*"
              required
              name="Message"
              className="resize-none xl:w-[500px] w-full h-[140px] hover:border-[var(--neutral)] focus:shadow-focusShadow hover:bg-[var(--zinc-100)] py-4 rounded outline-none px-6 border-[1.4px] border-black"
            />
            <div className="flex flex-wrap items-center gap-6">
              <button className="bg-[var(--black)]  text-[var(--white)] h-[56px] flex items-center py-2 px-3 gap-2 rounded-sm hover:bg-[var(--neutral)] border border-black active:text-black active:bg-white">
                Get In Touch
              </button>
              <SocialLinks />
            </div>
          </form>
     );
}
 
export default ContactForm;