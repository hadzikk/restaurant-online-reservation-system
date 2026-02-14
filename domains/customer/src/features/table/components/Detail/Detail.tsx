import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import styles from './Detail.module.css'

const Detail = () =>  {
    return (
        <div className={styles.root}>
            <figure className={styles.figure}>
                <img
                    className={styles.image}  
                    src='https://cdn.cosmos.so/a6d966bc-7eaa-4068-b79d-7cfe65db74e3?format=jpeg' 
                    alt=''  
                />
            </figure>
            <div className={styles.content}>
                <div className={styles.about}>
                    <div className={styles.general}>
                        <p className={styles.label}>table</p>
                        <p className={styles.code}>T-001</p>
                    </div>
                    <span className={styles.status}>available</span>
                </div>
                <details className={styles.detail}>
                    <summary className={styles.summary}>
                        <span className={styles.title}>description</span>
                        <span className={styles.arrow}>
                            <FontAwesomeIcon
                                icon={faAngleUp}
                            />
                        </span>
                    </summary>
                    <div className={styles.content}>
                        <p>lorem ipsum dolor sit amet adispiscing elit.</p>
                    </div>
                </details>
                <details className={styles.detail}>
                    <summary className={styles.summary}>
                        <span className={styles.title}>about this table</span>
                        <span className={styles.arrow}>
                            <FontAwesomeIcon
                                icon={faAngleUp}
                            />
                        </span>
                    </summary>
                    <div className={styles.content}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Size</td>
                                    <td>small</td>
                                </tr>
                                <tr>
                                    <td>Capacity</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Place</td>
                                    <td>indoor</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>
                <details className={styles.detail}>
                    <summary className={styles.summary}>
                        <span className={styles.title}>features</span>
                        <span className={styles.arrow}>
                            <FontAwesomeIcon
                                icon={faAngleUp}
                            />
                        </span>
                    </summary>
                    <div className={styles.content}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Plug</td>
                                    <td>2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>
            </div>
        </div>
    )
}

export default Detail