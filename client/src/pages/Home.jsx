import React from 'react'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
    <Header/>
    <BlogList/>
    <NewsLetter/>
    <Footer/>
    </div>
  )
}

export default Home
