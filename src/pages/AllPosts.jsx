import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
     const [fetched, setFetched] = useState(false)   //it's extra can remove but bandwidth will increase so fastly

    useEffect(() => {
        if (!fetched) {              // ✅ run only if not already fetched
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    setFetched(true)      // ✅ mark as fetched
                }
            })
        }
    }, [fetched])           // ✅ run effect only when 'fetched' changes

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts