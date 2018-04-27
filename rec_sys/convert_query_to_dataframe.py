from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config

import pandas as pd


def get_recommender_data():
    dbconfig = read_db_config()
    try:
        conn = MySQLConnection(**dbconfig)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM recommender_data')
        rows = cursor.fetchall()

        df = pd.DataFrame(rows, columns=['rcr_id', 'user_id', 'prod_id', 'cat_id', 'bid_amount', 'sold_at_price', 'age', 'state'])

    except Error as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

    return df
