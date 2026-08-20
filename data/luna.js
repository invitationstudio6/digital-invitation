function lunaCreateSlug(text) {
    return String(text || "")
        .toLowerCase()
        .trim()
        .replace(/ə/g, "e")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function lunaEscapeHtml(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function lunaFormatStory(story) {
    if (!story) {
        return "";
    }

    if (/<[a-z][\s\S]*>/i.test(story)) {
        return story;
    }

    return String(story)
        .split(/\n+/)
        .map(function (paragraph) {
            return "<p>" + lunaEscapeHtml(paragraph.trim()) + "</p>";
        })
        .filter(function (paragraph) {
            return paragraph !== "<p></p>";
        })
        .join("<br>");
}

function lunaGetInvitation(id) {
    var invitationId = String(id || "")
        .toLowerCase()
        .trim();

    if (!invitationId) {
        return null;
    }

    try {
        var stored = localStorage.getItem("luna_" + invitationId);

        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.warn("Luna localStorage oxuna bilmədi", error);
    }

    if (typeof invitations !== "undefined" && invitations[invitationId]) {
        return invitations[invitationId];
    }

    return null;
}

function lunaSaveInvitation(invitation) {
    if (!invitation || !invitation.id) {
        return;
    }

    localStorage.setItem(
        "luna_" + invitation.id,
        JSON.stringify(invitation)
    );

    localStorage.setItem("luna_last_invitation", invitation.id);
}

function lunaCountdownTarget(invitation) {
    if (!invitation) {
        return null;
    }

    var countdown = invitation.countdown;

    if (typeof countdown === "string" && countdown.trim()) {
        if (countdown.indexOf("+") !== -1 || /z$/i.test(countdown)) {
            return countdown;
        }

        return countdown + "+04:00";
    }

    if (countdown && countdown.date && countdown.time) {
        return countdown.date + "T" + countdown.time + ":00+04:00";
    }

    if (
        invitation.date &&
        invitation.time &&
        /^\d{4}-\d{2}-\d{2}$/.test(invitation.date)
    ) {
        return invitation.date + "T" + invitation.time + ":00+04:00";
    }

    return null;
}

function lunaDisplayNames(invitation) {
    var bride = (invitation && invitation.bride) || "";
    var groom = (invitation && invitation.groom) || "";

    if (bride && groom) {
        return bride + " & " + groom;
    }

    return bride || groom || "Luna";
}

function lunaGetRsvps(invitationId) {
    try {
        var raw = localStorage.getItem("luna_rsvp_" + invitationId);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
}

function lunaSaveRsvp(invitationId, entry) {
    var list = lunaGetRsvps(invitationId);
    list.push(entry);
    localStorage.setItem("luna_rsvp_" + invitationId, JSON.stringify(list));
}
