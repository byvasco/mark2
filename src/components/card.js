import React from 'react'
import { Link } from 'gatsby'

const Card = ({ type, cover, title, category, slug }) => {
  function redirectCategory() {
    console.log('hey');
  }

  return (
    <Link to={slug} className={`card card-post ${type}`}>
      <figure className="card-cover">
        <img src={cover} alt={title} />
      </figure>

      <div className="details">
        {/* <Link to={`/${category.toLowerCase()}/`} className="card-category caption-2">{category}</Link> */}
        <p className="card-category caption-2" onClick={()=> { this.redirectCategory() }}>{category}</p>
        <h4 className={`card-title ${type === 'small' ? 'title-4' : 'title-3'}`}>{title}</h4>
      </div>
    </Link>
  )
}

export default Card