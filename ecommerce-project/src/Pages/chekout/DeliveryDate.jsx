import dayjs from "dayjs"

export function DeliveryDate({selectedDeliveryOption}) {
    <div className="delivery-date">
        Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimMs).format('dddd, MMMM D')}
    </div>
}