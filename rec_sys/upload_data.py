from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config

def upload_universal(tuples):
	query = 'INSERT INTO universal_recommendation (product_id, popularity)'\
			'VALUES (%s,%s)'
	try:
		dbconfig = read_db_config()
		conn = MySQLConnection(**dbconfig)
		cursor = conn.cursor()
		cursor.executemany(query, tuples)
		conn.commit()
	except Error as e:
		print(e)
	finally:
		cursor.close()
		conn.close()

		
def upload_individual(tuples):
	query = 'INSERT INTO recommendation (user_id, prod_id)'\
			'VALUES (%s,%s)'
	try:
		dbconfig = read_db_config()
		conn = MySQLConnection(**dbconfig)
		cursor = conn.cursor()
		cursor.executemany(query, tuples)
		conn.commit()
	except Error as e:
		print(e)
	finally:
		cursor.close()
		conn.close()
