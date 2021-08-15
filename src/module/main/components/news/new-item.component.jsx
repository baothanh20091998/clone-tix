import React from 'react'

export default function NewItem(props) {
    const { news } = props
    return (
        <>
            <div className="newsblock__item">
                <div className="item__img">
                    <a href={news.link} target="_blank" rel="noopener noreferrer">
                        <img src={news.img} alt="tin tuc" />
                    </a>
                </div>
                <div className="item__info">
                    <h3 className="item__info--title">
                        <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}
                        </a>
                    </h3>
                    <p className="item__info--detail">
                        {news.content}
                    </p>
                </div>
            </div>
        </>
    )
}

{/* <div className="interact__wrapper">
    <div className="interact__item">
        <span className="interact__item--group">
            <img src="/images/like.png" alt="like" />
            <span className="like__num">
                83
            </span>
        </span>
    </div>
    <div className="interact__item">
        <span className="interact__item--group">
            <img src="/images/comment.png" alt="comment" />
            <span className="comment__num">
                76
            </span>
        </span>
    </div>
</div> */}