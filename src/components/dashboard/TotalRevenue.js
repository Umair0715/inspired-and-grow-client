import { Chart as ChartJS, registerables } from 'chart.js';
import DatePicker_ from 'components/global/Datepicker';
import { Line  } from 'react-chartjs-2'

const TotalRevenue = () => {
    ChartJS.register(...registerables);

    const lineState = {
        labels: ["Jan", "Feb" , "Mar" , "April" , "May" , "June" , "July" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"] ,
        datasets: [
           {
              label: "TOTAL AMOUNT",
              backgroundColor: ["tomato"],
              hoverBackgroundColor: ["rgb(197, 72, 49)"],
              data: [0, 50 , 34 , 555 , 321 , 22 , 50 , 777 , 384 , 91 , 38 , 89],
           },
        ],
     };

     const options = {
        plugins : {
            legend : false 
        } ,
       
        y : {
            min : 0 ,
            max : 1000 ,
            ticks : {
                stepSize : 200
            }
        }
     }

    return (
        <div>
            <h6 className='text-grayText text-lg font-semibold mb-2'>Total Revenue</h6>
            <div className='shadow-bg rounded-lg p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <p className='text-grayText'>Last Month Earning</p>
                    <div>
                        <DatePicker_
                        value={new Date()}

                        />
                    </div>
                </div>
                <Line data={lineState} options={options} />
            </div>
        </div>
    )
}

export default TotalRevenue