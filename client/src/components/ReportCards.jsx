import React, {useContext} from 'react';
import StarRating from './dashboard/StarRating';
import API from '../utils/API';
import { MainContext } from './context/MainContext';
import moment from 'moment';


const ReportCards = () => {
const { reportCards, setReportCards, selectedStudent, setSelectedStudent} = useContext(MainContext);

 // handler for deleting report card
 const onDeleteClick = async (e) => {
    const body = {id: e.id, studentId: selectedStudent.student.id};
  
    API.deleteReportCard(body)
      .then((res) => {
        setSelectedStudent(res.data);
        setReportCards(res.data.reportCards);
      })
      .catch((err) => console.error(err));
  };


    return (
        <div className='inner-container-for-report-cards'>
            {reportCards && reportCards.reverse().map((n,i) => (
            <div key={n.id} className='card-main-container'>
                  <button
                        className="delete-reportcard-btn"
                        onClick={() => onDeleteClick(n)}
                      >
                        &times;
                      </button>
            <div className="instructor-card-info-container">
            <span  className="instructor-card-info-span">Instructor: <br/> {n.instructor_name}</span>
               
            </div>
            <div className="content-card-container">
            <pre className="content-card-p"><span style={{fontStyle: 'italic'}}>Student Report:</span> <br/>{n.report}</pre>
            <span className="content-card-p">Points given: {n.Rating}</span><br/>
            <span className="content-card-p">Points possible: {n.points_possible}</span>
            </div>
            <div className='star-container-for-reportCard'>
            <span>
            <h4>{selectedStudent && <StarRating rating={(n.Rating/n.points_possible)*10} />} ({((n.Rating/n.points_possible)*100).toFixed(0)}%)</h4>
                </span>
                <br/>
             
                </div>
               <div className='date-stamp-report-card'>
                {`${moment(n.created_at).format('LL')}`}
                </div>
                {/* <span>{n.created_at}</span> */}
            </div>

            ))}
           
           
        </div>
    );
};

export default ReportCards;