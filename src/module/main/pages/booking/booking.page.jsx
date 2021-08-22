import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import avatar from '../../../../img/avatar.png'
import logo from '../../../../img/logo.png'
import screen from '../../../../img/screen.png'
import { choiceChairAction, getBookingAction, getListChairAction } from '../../../../store/actions/booking.action'
import "./booking.style.scss"


export default function Booking() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [modal, setModal] = useState()
    //open and close modal
    const toggleModal = () => {
        setModal(!modal)
    }
    //check the obj modal if true set the overlay hidden for body
    if (modal) {
        document.body.classList.add("active__modal")
    } else {
        document.body.classList.remove("active__modal")
    }

    const { id } = useParams()
    //call api to get the movie detail and list chair
    useEffect(() => {
        dispatch(getListChairAction(id))
    }, []);
    //get the danhSachGhe,thongTinPhim from store redux
    const { danhSachGhe } = useSelector((state) => state.booking.listChair)
    const { thongTinPhim } = useSelector(state => state.booking.listChair)
    const { totalMoney } = useSelector((state) => state.booking)
    //choice chair to buy
    const handleChoiceChair = (chair) => {
        dispatch(choiceChairAction(chair))
    }
    //get the list Seat have chosen
    const { listSeat } = useSelector(state => state.booking)
    //sort the list seat from low to high
    const listSeatSort = listSeat.sort((a, b) => a - b)
    //render to html the list seat had chosen
    const renderListSeatBooking = () => listSeatSort.map((seat, index) => {
        return (
            <p className="col-6" key={index}>Ghế {seat}</p>
        )
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const handleBooked = () => {
        setModal(!modal)
        const listChoice = danhSachGhe.filter(chair => chair.dangChon)
        dispatch(getBookingAction(thongTinPhim.maLichChieu, listChoice, history))
    }
    //check the chair is booked, booking or non booking
    const handleStatusChair = (chair, index) => {
        if (chair.daDat) {
            return (
                <button className="btn btn-danger chair__item" disabled key={index}></button>)
        } else {
            if (chair.dangChon) {
                return (<button
                    className="btn btn-success chair__item"
                    onClick={() => handleChoiceChair(chair)}
                >{chair.stt}</button>)
            } else if (!chair.dangChon) {
                if (chair.loaiGhe === "Thuong") {
                    return (
                        <button
                            className="btn chair__item"
                            key={index}
                            onClick={() => handleChoiceChair(chair)}

                        >{chair.stt}</button>
                    )
                }
                return (
                    <button
                        className="btn btn-info chair__item"
                        key={index}
                        onClick={() => handleChoiceChair(chair)}
                    >{chair.stt}</button>
                )

            }
        }
    }
    //render list chair to html
    const renderListChair = () => danhSachGhe?.map((chair, index) => {
        return handleStatusChair(chair, index)
    })
    let user = localStorage.getItem("hoTen")
    return (
        <section className="booking">
            <div className="booking__header">
                <div className="booking__logo">
                    <NavLink to="/">
                        <img src={logo} alt="" />
                    </NavLink>
                </div>
                <div className="booking__center">
                    <h3>CHỌN VÉ & THANH TOÁN</h3>
                </div>
                <div className="booking__user">
                    <img src={avatar} alt="" /><span>Xin chào, {user}</span>
                </div>
            </div>
            <div className="booking__content row">
                <div className="booking__left col-12 col-sm-9">
                    <div className="booking__left--content">
                        <div className="booking__left--title">
                            <img src={thongTinPhim?.hinhAnh} alt="" />
                            <div className="booking__left--cinema">
                                <p>{thongTinPhim?.tenCumRap}</p>
                                <p>{thongTinPhim?.diaChi} -- <span>{thongTinPhim?.tenRap}</span></p>
                            </div>
                        </div>
                        <div className="booking__left--screen">
                            <img src={screen} alt="" />
                        </div>
                        <div className="booking__left--listchair">
                            {renderListChair()}
                        </div>
                    </div>
                    <div className="booking__left--infochair">
                        <p>Thông tin màu ghế</p>
                        <div className="info__chair--item">
                            <div className="info__chair--content">
                                <button className="btn chair__item"></button>
                                <span>Ghế thường - 75.000 VND</span>
                            </div>
                            <div className="info__chair--content">
                                <button className="btn btn-info chair__item"></button>
                                <span>Ghế VIP - 90.000 VND</span>
                            </div>
                            <div className="info__chair--content">
                                <button disabled className="btn btn-danger chair__item"></button>
                                <span>Ghế đã được đặt</span>
                            </div>
                            <div className="info__chair--content">
                                <button className="btn btn-success chair__item"></button>
                                <span>Ghế đang chọn</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="booking__right col-12 col-sm-3">
                    <div className="booking__right--content">
                        <div className="booking__right--title">
                            <p>{totalMoney === 0 ? "Tổng giá vé" : totalMoney + " VND"}</p>
                            <hr />
                            <p>{thongTinPhim?.tenPhim}</p>
                            <hr />
                        </div>
                        <div className="booking__right--item">
                            <p>Ngày giờ chiếu</p>
                            <p>{thongTinPhim?.gioChieu} {thongTinPhim?.ngayChieu}</p>
                        </div>
                        <div className="booking__right--item">
                            <p>Cụm rạp</p>
                            <p>{thongTinPhim?.tenCumRap}</p>
                        </div>
                        <div className="booking__right--item">
                            <p>Rạp</p>
                            <p>{thongTinPhim?.tenRap}</p>
                        </div>
                        <div className="booking__right--item-chair">
                            <p>Ghế đã chọn</p>
                            <div className="booking__right--list-chair row">
                                {
                                    listSeat.length === 0 ?
                                        <p className="col-12">Vui lòng chọn ghế</p>
                                        :
                                        renderListSeatBooking()
                                }
                            </div>
                        </div>
                        <div className="booking__right--item-payment">
                            <p>Vui lòng chọn phương thức thanh toán</p>
                            <input type="radio" className="payment__value" id="cash" name="payment" value="1" checked />
                            <label htmlFor="cash">Tiền mặt</label><br />

                            <input type="radio" className="payment__value" id="atm" name="payment" value="2" checked />
                            <label htmlFor="atm">Thẻ ATM nội địa</label><br />

                            <input type="radio" className="payment__value" id="visa" name="payment" value="3" checked />
                            <label htmlFor="visa">Visa, Master, JCB</label>                        </div>
                        <div className="buy__ticket text-center">
                            {
                                totalMoney > 0 ?
                                    <button className="btn btn-info btn__buy" onClick={() => toggleModal()}>Mua vé</button> :
                                    <button className="btn btn-info btn__buy" disabled>Mua vé</button>
                            }


                        </div>
                    </div>
                </div>
            </div>
            {
                modal && (
                    <>
                        <div className="overlay" onClick={() => toggleModal()}></div>
                        <div className="modal__content">
                            <div className="modal__card">
                                <div className="modal__card--title">
                                    <p className="modal__card--title-info">i</p>
                                    <p>Vui lòng kiểm tra lại vé trước khi xác nhận</p>
                                </div>
                                <div className="modal__card--button">
                                    <button id="buyTicket" className="btn btn-success" onClick={() => handleBooked()} > Xác nhận</button>
                                    <button id="cancelTicket" className="btn btn-danger" onClick={() => toggleModal()}>Hủy</button>
                                </div>
                            </div>
                        </div>

                    </>
                )
            }
        </section>
    )
}
