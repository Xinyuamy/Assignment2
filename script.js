document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("container");
    const speakerIcon = document.getElementById("speaker-icon");
    const iconContainer = document.getElementById("icon-container");
    let volume = 10;
    let currentIcon = null;

    speakerIcon.addEventListener("click", () => {
        const isHidden = iconContainer.style.display === "none";
        iconContainer.style.display = isHidden ? "block" : "none";
    });

    function addAndAnimateIcon() {
        const icon = document.createElement("div");
        icon.className = "icon";
        icon.textContent = Math.random() > 0.5 ? "+" : "−";
        iconContainer.appendChild(icon);
        currentIcon = icon;

        setTimeout(() => {
            icon.classList.add("hide");
            icon.addEventListener("animationend", () => {
                icon.remove();
                currentIcon = null;
            });
        }, 10);
    }

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space" && currentIcon) {
            let iconRect = currentIcon.getBoundingClientRect();
            let speakerIconRect = speakerIcon.getBoundingClientRect();
            let targetStart = speakerIconRect.right + 80;
            let targetEnd = speakerIconRect.right + 120;

            if (iconRect.left >= targetStart && iconRect.left <= targetEnd) {
                let adjustedVolume = volume + (currentIcon.textContent === "+" ? 5 : -5);
                volume = Math.min(100, Math.max(0, adjustedVolume));
                document.getElementById("volume").textContent = `Volume: ${volume}`;
                currentIcon.remove();
                currentIcon = null;
            }
        }
    });

    setInterval(addAndAnimateIcon, getRandomInterval());
});

function getRandomInterval() {
    return Math.random() * 2000 + 1000;
}
