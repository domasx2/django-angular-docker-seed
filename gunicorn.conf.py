import multiprocessing

bind = "0.0.0.0:8000"
workers = multiprocessing.cpu_count() * 2 + 1
errorlog = '/tmp/logs/gunicorn/access.log'
loglevel = 'info'
accesslog = '/tmp/logs/gunicorn/error.log'