import React from 'react'
import { assets } from '../../assets/assets'

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment
  const blogDate = new Date(createdAt) // ✅ Use Date, not Data

  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b>: {blog?.title || "Untitled"}
        <br /><br />
        <b className='font-medium text-gray-600'>Name</b>: {name}
        <br />
        <b className='font-medium text-gray-600'>Comment</b>: {content}
      </td>
      
      <td className='px-6 py-4 max-sm:hidden'>
        {blogDate.toLocaleDateString()}
      </td>

      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              className='w-5 hover:scale-110 transition-all cursor-pointer'
              onClick={() => {
                console.log("Approving comment", _id)
                fetchComments()
              }}
            />
          ) : (
            <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
              Approved
            </p>
          )}

          <img
            src={assets.bin_icon}
            alt="delete"
            className='w-5 hover:scale-110 transition-all cursor-pointer'
            onClick={() => {
              console.log("Deleting comment", _id)
              fetchComments()
            }}
          />
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
