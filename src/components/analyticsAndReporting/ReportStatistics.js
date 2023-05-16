import { Chart as ChartJS, registerables } from 'chart.js';
import DatePicker_ from 'components/global/Datepicker';
import { Bar  } from 'react-chartjs-2'

const ReportStatistics = () => {
    ChartJS.register(...registerables);

    const lineState = {
        labels: ["Jan", "Feb" , "Mar" , "April" , "May" , "June" , "July" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"] ,
        datasets: [
           {
              label: "TOTAL AMOUNT",
              backgroundColor: '#FDA955',
              data: [0, 355 , 34 , 855 , 321 , 22 , 70 , 777 , 384 , 191 , 38 , 189],
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
            <h6 className='text-grayText text-lg font-semibold mb-2'>Statistics</h6>
            <div className='shadow-bg rounded-lg p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <p className='text-grayText'>Last Year Earning</p>
                    <div>
                        <DatePicker_
                        value={new Date()}
                        />
                    </div>
                </div>
                <Bar data={lineState} options={options} />
            </div>
        </div>
    )
}

export default ReportStatistics