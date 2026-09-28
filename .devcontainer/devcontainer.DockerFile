FROM mcr.microsoft.com/devcontainers/base:ubuntu

USER vscode

RUN \
	cd /home/vscode/ \
	&& \
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh > nvm.sh \
	&& \
	echo "48a0eee9a60e07422dce0eb5774754c83889570ca1ee2566c516acbe8af03a9e *nvm.sh" \
		| shasum -bc -a 256 \
	&& \
	export PROFILE="/home/vscode/.nvm.envrc" \
	&& \
	touch /home/vscode/.nvm.envrc && echo '. /home/vscode/.nvm.envrc' >> /home/vscode/.bashrc $\
	&& \
	cat nvm.sh | bash \
	&& \
	rm nvm.sh \
	&& \
	. $PROFILE \
	&& \
	nvm install 26
