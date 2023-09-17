# Tell Make that these are not files
.PHONY: setup run test clean

# Variables
VENV = .env
SRC = src

${VENV}/bin/activate: requirements.txt
	python3 -m venv ${VENV}
	${VENV}/bin/pip install -r requirements.txt

setup: ${VENV}/bin/activate 

api: setup
	${VENV}/bin/python3 ${SRC}/app.py

poller: setup
	${VENV}/bin/python3 ${SRC}/poller.py

test: setup
	${VENV}/bin/pytest tests

clean:
	rm -rf ${SRC}/__pycache__
	rm -rf ${VENV}



