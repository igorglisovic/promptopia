import PromptCard from '@components/PromptCard'
import Loading from '@components/Loading'

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {loading ? (
          <Loading />
        ) : (
          data.map(post => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default Profile
