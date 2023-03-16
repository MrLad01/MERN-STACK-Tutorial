import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

export default function Home() {
   const {workouts, dispatch } = useWorkoutsContext()
   const {user} = useAuthContext()
    

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts')
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
              {workouts && workouts.map((workout) => {
              return <WorkoutDetails key={workout._id} workout={workout} />
              })}  
            </div>
            <WorkoutForm />
        </div>
    )
}
