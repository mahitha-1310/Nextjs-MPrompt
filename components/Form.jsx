import Link from "next/link"

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="text-left head_text blue_gradient">{type} Post</h1>
      <p className="desc max-w-md text-left">{type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.</p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea 
          value={post.prompt} 
          onChange={(e) => setPost({...post, prompt: e.target.value})}
          placeholder="Write your prompt here"
          required
          className="form_textarea"
          
          />
        </label>
        <label>
          <span className="font-semibold text-base text-gray-700">Tag (#idea, #product, #webdevelopment)</span>
          <input 
          value={post.tag} 
          onChange={(e) => setPost({...post, tag: e.target.value})}
          placeholder="#tag"
          required
          className="form_input"
          
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">Cancel</Link>
          <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white" type="submit" disabled={submitting}>{submitting ? `${type}...` : type}</button>

        </div>
      </form>
    </section>


  )
}

export default Form