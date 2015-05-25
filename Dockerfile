FROM python:3.4.3

RUN apt-get update && apt-get install -y gettext

ADD requirements.txt /requirements.txt
RUN pip3 install -r requirements.txt
RUN mkdir static

VOLUME ["/static"]

WORKDIR /src
EXPOSE 8000
ENTRYPOINT ["python3", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]